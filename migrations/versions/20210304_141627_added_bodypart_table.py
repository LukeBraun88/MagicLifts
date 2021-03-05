"""added bodyPart table

Revision ID: b0e0d187a87a
Revises: 6a936dfe2547
Create Date: 2021-03-04 14:16:27.596221

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b0e0d187a87a'
down_revision = '6a936dfe2547'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('body_parts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=50), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('lifts', sa.Column('body_part_id', sa.Integer(), nullable=False))
    op.drop_constraint('lifts_user_id_fkey', 'lifts', type_='foreignkey')
    op.create_foreign_key(None, 'lifts', 'body_parts', ['body_part_id'], ['id'])
    op.drop_column('lifts', 'body_part')
    op.drop_column('lifts', 'user_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('lifts', sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.add_column('lifts', sa.Column('body_part', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'lifts', type_='foreignkey')
    op.create_foreign_key('lifts_user_id_fkey', 'lifts', 'users', ['user_id'], ['id'])
    op.drop_column('lifts', 'body_part_id')
    op.drop_table('body_parts')
    # ### end Alembic commands ###